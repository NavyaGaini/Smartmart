export const getRecentlyViewed = () => {
  const history = JSON.parse(localStorage.getItem("smartmart_history")) || [];

  const latest = {};

  history.forEach(e => {
    latest[e.itemId] = e.timestamp;
  });

  return Object.entries(latest)
    .map(([itemId, timestamp]) => ({ itemId, timestamp }))
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 6);
};