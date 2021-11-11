const handleHistoryPush = (history, id, path) => {
  if (path.includes('comidas')) history.push(`${id}/in-progress`);

  if (path.includes('bebidas')) history.push(`${id}/in-progress`);
};

export default handleHistoryPush;
