import css from "./ImageCard.module.css";

export default function ImageCard({
  item: {
    urls: { small, regular },
    description,
  },
}) {
  return (
    <div>
      <a href={regular} data-image-description={description}>
        <img
          className={css.galleryImage}
          src={small}
          alt={description}
          width="360"
          height="200"
          // orientation={landscape}
        />
      </a>
    </div>
  );
}
