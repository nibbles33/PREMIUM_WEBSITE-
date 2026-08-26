export type PaymentCarrier = {
  name: string;
  href: string;
  logo: string;
  logoAlt: string;
};

/**
 * Carrier payment portals verified against premiumib.com/payment/
 * (includes PAFCO and Unica present on the live list).
 */
export const paymentCarriers: PaymentCarrier[] = [
  {
    name: "Aviva",
    href: "https://www.aviva.ca/en/payment-broker/",
    logo: "/images/carriers/carrier-aviva.jpg",
    logoAlt: "Aviva logo",
  },
  {
    name: "Echelon Insurance",
    href: "https://echeloninsurance.ca/make-a-payment-using-paypal/",
    logo: "/images/carriers/carrier-echelon.jpg",
    logoAlt: "Echelon Insurance logo",
  },
  {
    name: "Chubb",
    href: "https://www.chubb.com/ca-en/contact-us/locations.aspx",
    logo: "/images/carriers/carrier-chubb.jpg",
    logoAlt: "Chubb logo",
  },
  {
    name: "Gore Mutual",
    href: "https://www.goremutual.ca/pay-by-cc/",
    logo: "/images/carriers/carrier-gore.jpg",
    logoAlt: "Gore Mutual logo",
  },
  {
    name: "CAA",
    href: "https://www.caasco.com/insurance/existing-customers/policies/auto",
    logo: "/images/carriers/carrier-caa.png",
    logoAlt: "CAA logo",
  },
  {
    name: "Pembridge",
    href: "https://consumer.pembridge.com/paymybill/",
    logo: "/images/carriers/carrier-pembridge.jpg",
    logoAlt: "Pembridge logo",
  },
  {
    name: "Northbridge",
    href: "https://www.nbins.com/contact-us/",
    logo: "/images/carriers/carrier-northbridge.jpg",
    logoAlt: "Northbridge Insurance logo",
  },
  {
    name: "Wawanesa",
    href: "https://www.wawanesa.com/canada/payments/myaccount.html",
    logo: "/images/carriers/carrier-wawanesa.jpg",
    logoAlt: "Wawanesa Insurance logo",
  },
  {
    name: "SGI Canada",
    href: "https://epayment.sgicanada.ca/payment/policy?product_code=epayment",
    logo: "/images/carriers/carrier-sgi.jpg",
    logoAlt: "SGI Canada logo",
  },
  {
    name: "Intact",
    href: "https://apps.intactinsurance.com/on/secure/payment-ontario.html",
    logo: "/images/carriers/carrier-intact.jpg",
    logoAlt: "Intact Insurance logo",
  },
  {
    name: "PAFCO",
    href: "https://consumer.pafco.ca/paymybill/StepOne.aspx",
    logo: "/images/carriers/carrier-pafco.png",
    logoAlt: "PAFCO logo",
  },
  {
    name: "Unica Insurance",
    href: "https://www.unicainsurance.com/make-a-payment/",
    logo: "/images/carriers/carrier-unica.png",
    logoAlt: "Unica Insurance logo",
  },
];
