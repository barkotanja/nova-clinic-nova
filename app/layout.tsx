import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nova-physiotherapy-addis.light-grape-9791.chatgpt.site"),
  title: "Nova Physiotherapy Speciality Clinic | Addis Ababa",
  description: "Restoring Movement, Renewing Life. Personalized physiotherapy and rehabilitation in Addis Ababa.",
  keywords: ["physiotherapy Addis Ababa", "Nova Physiotherapy", "rehabilitation Ethiopia", "pain management"],
  openGraph: { title: "Nova Physiotherapy Speciality Clinic", description: "Restoring Movement, Renewing Life", type: "website", images: ["/assets/logo/nova-logo.jpg"] },
  twitter: { card: "summary_large_image", title: "Nova Physiotherapy Speciality Clinic", description: "Restoring Movement, Renewing Life", images: ["/assets/logo/nova-logo.jpg"] },
  icons: { icon: "/assets/logo/nova-logo.jpg", shortcut: "/assets/logo/nova-logo.jpg", apple: "/assets/logo/nova-logo.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "MedicalClinic", name: "Nova Physiotherapy Speciality Clinic", telephone: "+251998989862", address: { "@type": "PostalAddress", streetAddress: "Girar Plaza, Edna Mall road to 22, Djibouti Street", addressLocality: "Addis Ababa", postalCode: "1000", addressCountry: "ET" }, openingHours: "Mo-Sa 08:00-20:00" }) }} /></body></html>;
}
