import { Container } from "@/components/ui/Container";

export function LegalDisclaimer() {
  return (
    <div className="border-t border-gray-800 py-6">
      <Container>
        <p className="text-xs leading-relaxed text-gray-500">
          * Alle auf dieser Website genannten Zahlen, Kosten, Einsparungen,
          Förderbeträge und Leistungswerte sind unverbindliche Beispielrechnungen
          und Richtwerte. Sie stellen idealisierte Szenarien dar und dienen
          ausschließlich der allgemeinen Information. Die tatsächlichen Werte
          können je nach individueller Situation, Gebäudezustand,
          Dämmstandard, Region, Energiepreisen, klimatischen Bedingungen und
          geltenden Förderbedingungen erheblich abweichen. Förderprogramme
          unterliegen den jeweils aktuellen Richtlinien des Bundes und der
          Länder und können jederzeit geändert oder eingestellt werden. Es
          besteht kein Rechtsanspruch auf die genannten Förderbeträge oder
          Einsparungen. Eine verbindliche Aussage erhalten Sie ausschließlich
          im Rahmen einer individuellen Beratung und Angebotserstellung.
          Stand: {new Date().getFullYear()}.
        </p>
      </Container>
    </div>
  );
}
