        // Initialize WOW.js for scroll animations
        new WOW().init();
        
        // Toggle sidebar on mobile
        $('.sidebar-toggle').click(function() {
            $('.sidebar').toggleClass('active');
        });
        
        // Navigation and section switching
    // Update navigation script
$('.nav-link').click(function(e) {
    e.preventDefault();
    
    const target = $(this).attr('href');
    
    // Handle logout separately
    if (target === '#logout') {
        Swal.fire({
            title: 'Logout?',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#30E3CA',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect to login page
                window.location.href = '/login';
            }
        });
        return;
    }
    
    // Remove active class from all links
    $('.nav-link').removeClass('active');
    
    // Add active class to clicked link
    $(this).addClass('active');
    
    // Hide all sections
    $('.content-section').removeClass('active');
    
    // Show target section with animation
    setTimeout(() => {
        $(target).addClass('active');
        new WOW().init(); // Reinitialize animations
        
        // Update topbar title
        const sectionTitle = $(this).text().trim().replace(/^\d+\s*/, '');
        $('.topbar h4').text(sectionTitle);
        
        // Close sidebar on mobile
        if ($(window).width() < 992) {
            $('.sidebar').removeClass('active');
        }
    }, 50);
});

// Password visibility toggle
$('.toggle-password').click(function() {
    const input = $(this).closest('.input-group').find('input');
    const type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
});

// Initialize charts for new sections
function initEarningsChart() {
    const earningsCtx = document.getElementById('earningsReportChart').getContext('2d');
    new Chart(earningsCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Earnings ($)',
                data: [4200, 5800, 4500, 6200, 7800, 9100, 8420],
                backgroundColor: 'rgba(48, 227, 202, 0.7)',
                borderColor: '#30E3CA',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize charts when section becomes active
$(document).on('click', '.nav-link[href="#earnings"]', initEarningsChart);
        // Charts
        // Earnings Chart
        const earningsCtx = document.getElementById('earningsChart').getContext('2d');
        const earningsChart = new Chart(earningsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Earnings ($)',
                    data: [2500, 3200, 2800, 4100, 3700, 5200, 4800],
                    borderColor: '#30E3CA',
                    backgroundColor: 'rgba(48, 227, 202, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        
        // Destination Chart
        const destinationCtx = document.getElementById('destinationChart').getContext('2d');
        const destinationChart = new Chart(destinationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Italy', 'Bali', 'Japan', 'Greece', 'Spain'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#30E3CA',
                        '#11999E',
                        '#40514E',
                        '#2C3E50',
                        '#6C757D'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '70%'
            }
        });
        
        /* Logout function  */

        // Add to existing script
$('.nav-link[href="#logout"]').click(function(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Logout?',
        text: 'Are you sure you want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#30E3CA',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, logout!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate logout redirect
            window.location.href = '/login';
        }
    });
});
        // Initialize Bootstrap dropdowns
        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
        const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
            return new bootstrap.Dropdown(dropdownToggleEl)
        });
