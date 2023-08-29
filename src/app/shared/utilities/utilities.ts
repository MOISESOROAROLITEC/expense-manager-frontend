export const getInitialName = (name: string) => {
  const sname = name.split(" ");
  let firstLatter = "";
  for (const name of sname) {
    firstLatter = firstLatter + (name[0]?.toUpperCase() || "");
  }
  return firstLatter;
};

export const getFirstName = (name: string): string => {
  return name.split(" ")[0];
};
