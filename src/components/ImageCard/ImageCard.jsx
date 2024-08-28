export default function ImageCard({
  item: {
    urls: { small, regular },
    description,
  },
}) {
  return (
    <div>
      <a href={regular} data-image-description={description}>
        <img src={small} alt={description} width="360" height="200" />
      </a>
    </div>
  );
}
