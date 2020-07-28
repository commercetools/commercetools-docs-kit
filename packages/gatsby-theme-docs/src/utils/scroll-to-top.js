function scrollToTop() {
  const layoutPage = document.querySelector('#header');
  layoutPage.scrollIntoView({
    block: 'start',
  });
}

export default scrollToTop;
