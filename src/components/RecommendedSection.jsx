import { allItems } from "../data/mockData";

export default function RecommendedSection({ items = [] }) {
  if (!items.length) return null;

  return (
    <div>
      <h2>Recommended for You</h2>
      {items.slice(0, 6).map(i => {
        const item = allItems.find(d => d.id === i.itemId);
        if (!item) return null;

        return <div key={i.itemId}>{item.name}</div>;
      })}
    </div>
  );
}