const MaterialMaster = require('../models/MaterialMaster');
const Section = require('../models/Section');
const Bin = require('../models/Bin');

exports.allocateBin = async (skuCode, batch) => {
  try {
    // Step 1: Retrieve SKU GRP and SSI for the SKU Code
    const skuDetails = await MaterialMaster.findOne({ skuCode}).exec();
    if (!skuDetails) {
      throw new Error('SKU not found');
    }
    console.log()
    const skuGrp = skuDetails.skuGrp;
    const ssi = skuDetails.ssi;

    // Step 2 & 3: Retrieve sections for SKU GRP and SSI combination
    const sections = await Section.find({ skuGrp, ssi }).exec();
    if (!sections.length) {
      throw new Error('No sections found for given SKU GRP and SSI combination');
    }
    
    //console.log('Sections:', sections);

    // Step 4: Search for bins with same SKU and batch
    for (const section of sections) {
      const bins = await Bin.find({ skuCode, batch }).exec();
      //console.log(`Bins in section :`, bins);
      
      // Step 5: Check bin capacity and allocate if available
      for (const bin of bins) {
        if (bin.binCapacity > bin.usedCapacity) {
          bin.usedCapacity += 1; // Increment the quantity
          await bin.save(); // Save the updated bin
          //console.log('Bin allocated:', bin);
          return bin; // Return the allocated bin
        }
      }
    }

  //  console.log('No available bins with sufficient capacity.');
    return 'No available bins with sufficient capacity.';
  } catch (error) {
   // console.error(error);
    return 'Error occurred during bin allocation.';
  }
};