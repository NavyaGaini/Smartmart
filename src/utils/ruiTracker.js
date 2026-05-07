export const trackEvent = (itemId, category, type = "click") => {
  const history = JSON.parse(localStorage.getItem("smartmart_history")) || [];

  history.push({
    itemId,
    category,
    type,
    timestamp: Date.now()
  });

  localStorage.setItem("smartmart_history", JSON.stringify(history));
};