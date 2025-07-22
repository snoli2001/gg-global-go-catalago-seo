export interface Dealer {
  id: string;
  name: string;
  slug: string;
  allow_pre_owned: "True" | "False";
  allow_cash_sales: "True" | "False";
  whatsapp_sales_number: string;
}