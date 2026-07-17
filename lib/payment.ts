export function getPaymentRecommendation(price: number) {
  if (price >= 1200) {
    return "Acompte de réservation, puis reste à la livraison";
  }

  if (price >= 600) {
    return "Paiement à la livraison avec confirmation par téléphone";
  }

  return "Paiement à la livraison";
}
