document.addEventListener('DOMContentLoaded', function() {
    const productionLineSelect = document.getElementById('productionLine');
    const skuCodeInput = document.getElementById('skuCode');
    const skuDescInput = document.getElementById('skuDesc');
    const sutInput = document.getElementById('sut');
    const dateInput = document.getElementById('date');
    
    // Fetch production lines and populate the select element
    fetch('/production-lines')
        .then(response => response.json())
        .then(data => {
            data.forEach(line => {
                const option = document.createElement('option');
                option.value = line;
                option.textContent = line;
                productionLineSelect.appendChild(option);
            });
        });

    // Fetch SKU details based on SKU Code input
    skuCodeInput.addEventListener('blur', function() {
        fetch(`/materials?skuCode=${skuCodeInput.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const sku = data[0];
                    skuDescInput.value = sku.skuDesc;
                    sutInput.value = sku.sut;
                }
            });
    });

    // Set maximum date for the date picker
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);

    // Handle form submission
    document.getElementById('inboundForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => { data[key] = value });

        fetch('/process-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Form submitted successfully!');
                // Optionally, redirect to the pallet table page
                // window.location.href = '/pallets';
            } else {
                alert('Error: ' + data.message);
            }
        });
    });
});






document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const processOrderSelect = document.getElementById('processOrder');
    const forkliftOperatorSelect = document.getElementById('forkliftOperator');

    // Fetch process orders
    fetch('/forklift/incomplete-process-orders')
        .then(response => response.json())
        .then(data => {
            data.forEach(order => {
                const option = document.createElement('option');
                option.value = order._id;
                option.textContent = order.processOrder;
                processOrderSelect.appendChild(option);
            });
        });

    // Fetch forklift operators
    fetch('/forklift/forklift-operators')
        .then(response => response.json())
        .then(data => {
            data.forEach(operator => {
                const option = document.createElement('option');
                option.value = operator._id;
                option.textContent = operator.name;
                forkliftOperatorSelect.appendChild(option);
            });
        });

    // Handle form submission
    document.getElementById('assignmentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => { data[key] = value });

        fetch('/forklift/assign-forklift', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Forklift Operator Assigned!');
                // Optionally, redirect to the forklift operator screen
                // window.location.href = '/forklift-operator-screen';
            } else {
                alert('Error: ' + data.message);
            }
        });
    });

    // Fetch and display forklift operator screen data
    fetch('/forklift/confirmed-transfer-orders')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('table tbody');
            data.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${new Date(order.date).toLocaleDateString()}</td>
                    <td>${order.processOrder}</td>
                    <td>${order.skuCode}</td>
                    <td>${order.skuDesc}</td>
                    <td>${order.sut}</td>
                    <td>${order.batch}</td>
                    <td>${order.palletQty}</td>
                    <td>${order.binNumber}</td>
                    <td>${order.threeDigitCode || ''}</td>
                    <td>${order.status}</td>
                    <td><button class="edit" data-id="${order._id}">Edit</button></td>
                    <td><button class="delete" data-id="${order._id}">Delete</button></td>
                    <td><button class="confirm" data-id="${order._id}">Confirm</button></td>
                `;
                tbody.appendChild(row);
            });
        });

    // Handle edit, delete, and confirm button clicks
    document.querySelector('table').addEventListener('click', function(event) {
        if (event.target.classList.contains('edit')) {
            const id = event.target.dataset.id;
            // Handle editing logic here
        } else if (event.target.classList.contains('delete')) {
            const id = event.target.dataset.id;
            fetch(`/forklift/delete-transfer-order/${id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Transfer Order Deleted!');
                    location.reload();
                } else {
                    alert('Error: ' + data.message);
                }
            });
        } else if (event.target.classList.contains('confirm')) {
            const id = event.target.dataset.id;
            const code = prompt('Enter 3-digit code:');
            if (code) {
                fetch(`/forklift/confirm-transfer-order/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ threeDigitCode: code }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Transfer Order Confirmed!');
                        location.reload();
                    } else {
                        alert('Error: ' + data.message);
                    }
                });
            }
        }
    });
});








$(document).ready(function() {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	document.title='Simple DataTable';
	// DataTable initialisation
	$('#example').DataTable(
		{
			"dom": '<"dt-buttons"Bf><"clear">lirtp',
			"paging": true,
			"autoWidth": true,
			"buttons": [
				'colvis',
				'copyHtml5',
        'csvHtml5',
				'excelHtml5',
        'pdfHtml5',
				'print'
			]
		}
	);
});

  


// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});
