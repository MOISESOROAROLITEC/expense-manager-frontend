export function displayAccountNameFromType(
  accountType: "Bank" | "Bourse" | "BoxMoney"
): string {
  const accountTypeAndName = {
    Bank: "Compte Banquaire",
    Bourse: "Bourse",
    BoxMoney: "Espèce à la maison",
  };
  return accountTypeAndName[accountType];
}
