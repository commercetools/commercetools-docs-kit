function scrollToTop() {
  const layoutPage = document.querySelector('#top');
  layoutPage.scrollIntoView({
    block: 'start',
  });
}

export default scrollToTop;
