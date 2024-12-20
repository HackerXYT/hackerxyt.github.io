const scrollThreshold = 15; // Adjust this value to your needs
const bottomSearchParent = document.getElementById('bottomSearchParent');
const iconInC = document.getElementById('iconInC');
const triggerSearch = document.getElementById('triggerSearch');
const searchIntelli = document.getElementById('searchIntelli');

// Listen for the scroll event
document.getElementById('main-wrapper').addEventListener('scroll', () => {
  // Check if scroll position exceeds the threshold
  if (document.getElementById('main-wrapper').scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
    // Add class to shrink and hide icons
    bottomSearchParent.classList.add('scrolled');
  } else {
    // Remove class to reset to original state
    bottomSearchParent.classList.remove('scrolled');
  }
});


function run() {
    // Add class to shrink and hide icons
    bottomSearchParent.classList.add('scrolled');
}
