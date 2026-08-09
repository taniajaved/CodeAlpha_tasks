// Selecting all menu links and section containers from the DOM spec
const navigationItems = document.querySelectorAll('.nav-item');
const viewportSections = document.querySelectorAll('.page-section');
const crossLinks = document.querySelectorAll('.navigate-btn');
function triggerPanelUnmount(viewId) {
    // Stage 1: Active visual light change array inside sidebar
    navigationItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === viewId) {
            item.classList.add('active');
        }
    });

    // Stage 2: Instantly swap current section state view visibility
    viewportSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === viewId) {
            section.classList.add('active');
        }
    });
}
// Bind sidebar menu triggers execution
navigationItems.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const activeTarget = trigger.getAttribute('data-target');
        triggerPanelUnmount(activeTarget);
    });
});

// Bind internal UI link redirection buttons
crossLinks.forEach(button => {
    button.addEventListener('click', () => {
        const targetView = button.getAttribute('data-target');
        triggerPanelUnmount(targetView);
    });
});

// Secure contact submission intercept data logs
document.getElementById('portfolio-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('System Signal: Logging transmission sequence successful.');
    this.reset();
});
