function sanitizeSlug(slug) {
  return slug.replace(/[-_]+$/, '');
}

module.exports = sanitizeSlug;
