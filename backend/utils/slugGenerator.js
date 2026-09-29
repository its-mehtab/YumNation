import slugify from "slugify";
import { nanoid } from "nanoid";

const slugGenerator = async function (next) {
  if (!this.isModified("name") && !this.isModified("address.city")) {
    return next();
  }

  try {
    const city = this.address?.city;

    const slugSource = city ? `${this.name}-${city}` : this.name;

    const slug = slugify(slugSource, {
      lower: true,
      strict: true,
    });

    const exists = await this.constructor.findOne({
      slug,
      _id: { $ne: this._id },
    });

    this.slug = exists ? `${slug}-${nanoid(4)}` : slug;

    next();
  } catch (err) {
    next(err);
  }
};

export default slugGenerator;
