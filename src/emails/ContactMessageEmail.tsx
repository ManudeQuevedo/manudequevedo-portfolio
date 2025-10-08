import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
  Link,
} from "@react-email/components";

type Locale = "en" | "es";

const L = {
  en: {
    preview: (name: string) => `New inquiry from ${name}`,
    title: "New Inquiry",
    fromForm: "From your portfolio contact form",
    name: "Name",
    email: "Email",
    org: "Organization",
    phone: "Phone",
    purpose: "Purpose",
    summary: "Summary",
    sentFrom: "Sent from",
  },
  es: {
    preview: (name: string) => `Nueva consulta de ${name}`,
    title: "Nueva consulta",
    fromForm: "Desde el formulario de contacto de tu portafolio",
    name: "Nombre",
    email: "Correo",
    org: "Organización",
    phone: "Teléfono",
    purpose: "Motivo",
    summary: "Resumen",
    sentFrom: "Enviado desde",
  },
};

type Props = {
  purpose: string;
  summary: string;
  fullName: string;
  email: string;
  org?: string;
  phone?: string;
  message: string;
  siteUrl?: string;
  locale?: Locale; // <- idioma
};

export default function ContactMessageEmail({
  purpose,
  summary,
  fullName,
  email,
  org,
  phone,
  message,
  siteUrl = "https://www.manudequevedo.com",
  locale = "en",
}: Props) {
  const t = L[locale] ?? L.en;

  return (
    <Html>
      <Head />
      <Preview>{t.preview(fullName)}</Preview>
      <Body
        style={{
          backgroundColor: "#f6f6f8",
          fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji"',
          color: "#0f172a",
        }}>
        <Container
          style={{
            maxWidth: 560,
            margin: "32px auto",
            background: "#ffffff",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 2px rgba(0,0,0,.03)",
            padding: "24px 22px",
          }}>
          <Heading style={{ fontSize: 20, margin: "0 0 8px" }}>
            {t.title}
          </Heading>
          <Text style={{ margin: 0, color: "#6b7280" }}>{t.fromForm}</Text>

          <Section style={{ marginTop: 16 }}>
            <Text style={{ margin: "0 0 6px" }}>
              <strong>{t.name}:</strong> {fullName}
            </Text>
            <Text style={{ margin: "0 0 6px" }}>
              <strong>{t.email}:</strong>{" "}
              <Link href={`mailto:${email}`} style={{ color: "#2563eb" }}>
                {email}
              </Link>
            </Text>
            {org ? (
              <Text style={{ margin: "0 0 6px" }}>
                <strong>{t.org}:</strong> {org}
              </Text>
            ) : null}
            {phone ? (
              <Text style={{ margin: "0 0 6px" }}>
                <strong>{t.phone}:</strong> {phone}
              </Text>
            ) : null}
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

          <Section>
            <Text style={{ margin: "0 0 6px" }}>
              <strong>{t.purpose}:</strong> {purpose}
            </Text>
            {summary ? (
              <Text style={{ margin: "0 0 6px" }}>
                <strong>{t.summary}:</strong> {summary}
              </Text>
            ) : null}
          </Section>

          <Section
            style={{
              marginTop: 12,
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "12px 12px",
            }}>
            <Text style={{ whiteSpace: "pre-wrap", margin: 0 }}>{message}</Text>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

          <Text style={{ fontSize: 12, color: "#6b7280" }}>
            {t.sentFrom}{" "}
            <Link href={siteUrl} style={{ color: "#2563eb" }}>
              {siteUrl.replace(/^https?:\/\//, "")}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
