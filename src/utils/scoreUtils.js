export const getRankedItems = () => {
  const history = JSON.parse(localStorage.getItem("smartmart_history")) || [];

  const map = {};

  history.forEach(event => {
    if (!map[event.itemId]) {
      map[event.itemId] = {
        itemId: event.itemId,
        category: event.category,
        clicks: 0,
        lastUsed: event.timestamp
      };
    }

    map[event.itemId].clicks += 1;

    if (event.timestamp > map[event.itemId].lastUsed) {
      map[event.itemId].lastUsed = event.timestamp;
    }
  });

  const now = Date.now();

  return Object.values(map)
    .map(item => {
      const hours = (now - item.lastUsed) / (1000 * 60 * 60);
      const score = item.clicks * 3 + (hours > 0 ? 1 / hours : 1);
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score);
};