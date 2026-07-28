import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface WelcomeNewsletterProps {
  email: string;
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0];
  return local
    .split(/[._-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export const WelcomeNewsletter = ({
  email = "subscriber@example.com",
}: WelcomeNewsletterProps) => {
  const displayName = nameFromEmail(email);
  return (
    <Html>
      <Head />
      <Preview>Welcome to the Inner Circle — Your First Dispatch Awaits</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#00ff87",
                bgDark: "#050e0a",
                bgCard: "#091a11",
                textLight: "#e5efe3",
              },
            },
          },
        }}
      >
        <Body className="bg-bgDark my-auto mx-auto font-sans">
          <Container className="border border-solid border-white/10 rounded-xl my-[40px] mx-auto p-[20px] max-w-[600px] bg-bgCard">
            <Section className="mt-[32px] mb-[40px]" align="center">
              <Section className="mb-4" align="center">
                <Heading className="text-textLight text-[28px] font-black tracking-[0.1em] m-0 italic text-center">
                  AUTO<span className="text-brand">DEAL</span>
                </Heading>
                <Section className="w-full mt-1 border-t border-brand border-solid" />
                <Text className="text-brand text-[7px] tracking-[0.4em] uppercase mt-1 opacity-70 text-center">
                  THE INNER CIRCLE
                </Text>
              </Section>

              <Heading className="text-textLight text-[32px] font-bold italic mt-4 text-center">
                You&apos;re In.
              </Heading>
            </Section>

            <Section className="my-[20px]">
              <Text className="text-textLight/70 text-[14px] leading-[24px]">
                Welcome to the Inner Circle,{" "}
                <Text className="text-textLight font-semibold inline">
                  {displayName}
                </Text>
                .
              </Text>
              <Text className="text-textLight/70 text-[14px] leading-[24px]">
                You now have a front-row seat to the world&apos;s most
                exceptional automotive inventory. As a member, you&apos;ll
                receive:
              </Text>
            </Section>

            <Section className="my-[30px] space-y-[16px]">
              {[
                ["New Arrivals", "Be the first to see freshly curated inventory"],
                ["Private Drops", "Exclusive access to off-market collections"],
                ["Concierge Invitations", "First notice on showroom events and private viewings"],
                ["Market Insights", "Curated intelligence on the collector market"],
              ].map(([title, desc]) => (
                <Section key={title} className="bg-brand/[0.03] p-[16px] rounded-lg">
                  <Text className="text-brand text-[12px] font-bold tracking-[0.15em] uppercase m-0 mb-[4px]">
                    {title}
                  </Text>
                  <Text className="text-textLight/60 text-[13px] m-0 leading-[1.5]">
                    {desc}
                  </Text>
                </Section>
              ))}
            </Section>

            <Hr className="border-white/10 my-[30px]" />

            <Section className="text-center mt-[40px]">
              <Text className="text-textLight/40 text-[11px] leading-[18px] mb-[20px]">
                We respect your focus. You&apos;ll receive only the most
                significant dispatches — no noise, no clutter. Unsubscribe with
                a single click at any time.
              </Text>
              <Text className="text-textLight text-[10px] font-bold tracking-[0.3em] uppercase">
                AUTO<span className="text-brand">DEAL</span> | THE PEAK OF
                PERFORMANCE
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeNewsletter;