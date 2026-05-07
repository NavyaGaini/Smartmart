import { allItems } from "../data/mockData";

export default function RecentSection({ items = [] }) {
  if (!items.length) return null;

  return (
    <div>
      <h2>Recently Viewed</h2>
      {items.map(i => {
        const item = allItems.find(d => d.id === i.itemId);
        if (!item) return null;

        return <div key={i.itemId}>{item.name}</div>;
      })}
    </div>
  );
}