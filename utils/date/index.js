const AddOneDay = (date) => {
  if (!date) return null;
  let d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString();
};

const wishMessage = () => {
  let day = new Date();
  let hr = day.getHours();
  if (hr >= 0 && hr < 12) {
    return "Bonjour!";
  } else if (hr == 12) {
    return "Bon midi!";
  } else if (hr >= 12 && hr <= 17) {
    return "Bonne après-midi!";
  } else {
    return "Bonsoir!";
  }
};

export { AddOneDay, wishMessage };
