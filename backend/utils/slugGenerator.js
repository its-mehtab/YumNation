const slugGenerator = function (next) {
  if (!this.isModified("name")) return next();

  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  next();
};

export default slugGenerator;
