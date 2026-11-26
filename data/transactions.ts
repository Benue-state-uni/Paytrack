export type TransactionStatus = "Success" | "Pending" | "Failed" | "Flagged"
export type TransactionType = "Transfer" | "Card" | "USSD" | "POS"

export type Transaction = {
  id: string
  sender: string
  receiver: string
  amount: number
  type: TransactionType
  status: TransactionStatus
  date: string
  time: string
  initials: string
  color: string
}

export const transactions: Transaction[] = [
  { id: "PT-829104", sender: "Adebayo Johnson", receiver: "Chidinma Okafor", amount: 245000, type: "Transfer", status: "Success", date: "Today, 10:42 AM", time: "10:42 AM", initials: "AJ", color: "#dbeafe" },
  { id: "PT-829103", sender: "Fatima Bello", receiver: "Tunde Bakare", amount: 85000, type: "Card", status: "Pending", date: "Today, 10:38 AM", time: "10:38 AM", initials: "FB", color: "#fce7f3" },
  { id: "PT-829102", sender: "Emeka Nwosu", receiver: "Grace Eze", amount: 1250000, type: "Transfer", status: "Flagged", date: "Today, 10:31 AM", time: "10:31 AM", initials: "EN", color: "#dcfce7" },
  { id: "PT-829101", sender: "Ngozi Adeyemi", receiver: "Kola Williams", amount: 42000, type: "USSD", status: "Success", date: "Today, 10:24 AM", time: "10:24 AM", initials: "NA", color: "#fef3c7" },
  { id: "PT-829100", sender: "Ibrahim Musa", receiver: "Zainab Yusuf", amount: 310000, type: "POS", status: "Failed", date: "Today, 10:19 AM", time: "10:19 AM", initials: "IM", color: "#ede9fe" },
  { id: "PT-829099", sender: "Temitope Akinola", receiver: "Bola Adekunle", amount: 175000, type: "Transfer", status: "Success", date: "Today, 10:12 AM", time: "10:12 AM", initials: "TA", color: "#ffedd5" },
  { id: "PT-829098", sender: "Samuel Ojo", receiver: "Amaka Umeh", amount: 68000, type: "Card", status: "Success", date: "Today, 10:06 AM", time: "10:06 AM", initials: "SO", color: "#cffafe" },
  { id: "PT-829097", sender: "Hauwa Ibrahim", receiver: "Peter Obi", amount: 550000, type: "Transfer", status: "Pending", date: "Today, 9:58 AM", time: "9:58 AM", initials: "HI", color: "#f3e8ff" },
  { id: "PT-829096", sender: "David Okoro", receiver: "Mariam Bello", amount: 92000, type: "USSD", status: "Success", date: "Today, 9:45 AM", time: "9:45 AM", initials: "DO", color: "#e0e7ff" },
  { id: "PT-829095", sender: "Bisola Adebisi", receiver: "Chuka Obi", amount: 1750000, type: "Card", status: "Flagged", date: "Today, 9:39 AM", time: "9:39 AM", initials: "BA", color: "#fce7f3" },
  { id: "PT-829094", sender: "Oluwaseun Lawal", receiver: "Joy Ekanem", amount: 215000, type: "Transfer", status: "Success", date: "Today, 9:27 AM", time: "9:27 AM", initials: "OL", color: "#dcfce7" },
  { id: "PT-829093", sender: "Chisom Eze", receiver: "Musa Garba", amount: 33000, type: "POS", status: "Failed", date: "Today, 9:14 AM", time: "9:14 AM", initials: "CE", color: "#fef3c7" },
  { id: "PT-829092", sender: "Kunle Oladipo", receiver: "Aisha Danjuma", amount: 485000, type: "Transfer", status: "Success", date: "Today, 9:02 AM", time: "9:02 AM", initials: "KO", color: "#dbeafe" },
  { id: "PT-829091", sender: "Nneka Ekwueme", receiver: "Femi Ajayi", amount: 120000, type: "Card", status: "Pending", date: "Today, 8:51 AM", time: "8:51 AM", initials: "NE", color: "#e0f2fe" },
  { id: "PT-829090", sender: "Abdul Sani", receiver: "Adaeze Nnamdi", amount: 275000, type: "Transfer", status: "Success", date: "Today, 8:40 AM", time: "8:40 AM", initials: "AS", color: "#f3e8ff" },
]
