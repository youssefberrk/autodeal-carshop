import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Row,
	Section,
	Text,
	Tailwind,
} from "@react-email/components";
import * as React from "react";

interface OrderConfirmationEmailProps {
	fullName: string;
	orderId: string;
	totalAmount: number;
	cars: Array<{
		brand: string;
		model: string;
		price: number;
		image: string;
	}>;
}

export const OrderConfirmationEmail = ({
	fullName = "Valued Client",
	orderId = "ORD-000000",
	totalAmount = 0,
	cars = [],
}: OrderConfirmationEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Your Obsidian Build Slot Allocation is Secured</Preview>
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
				}}>
				<Body className="bg-bgDark my-auto mx-auto font-sans">
					<Container className="border border-solid border-white/10 rounded-xl my-[40px] mx-auto p-[20px] max-w-[600px] bg-bgCard">
						<Section className="mt-[32px] mb-[40px]" align="center">
							<Section className="mb-4" align="center">
								<Heading className="text-textLight text-[28px] font-black tracking-[0.1em] m-0 italic text-center">
									AUTO<span className="text-brand">DEAL</span>
								</Heading>
								<Section className="w-full mt-1 border-t border-brand border-solid" />
								<Text className="text-brand text-[7px] tracking-[0.4em] uppercase mt-1 opacity-70 text-center">
									PREMIUM AUTOMOTIVE
								</Text>
							</Section>

							<Heading className="text-textLight text-[32px] font-bold italic mt-4 text-center">
								Build Slot Secured
							</Heading>
						</Section>

						<Section className="my-[20px]">
							<Text className="text-textLight/70 text-[14px] leading-[24px]">
								Dear {fullName},
							</Text>
							<Text className="text-textLight/70 text-[14px] leading-[24px]">
								Congratulations. Your allocation for the following mechanical
								masterpieces has been officially secured. Our concierge team is
								currently preparing your build specifications.
							</Text>
						</Section>

						<Section className="bg-brand/[0.03] p-[20px] rounded-lg my-[30px]">
							<Row>
								<Column>
									<Text className="text-textLight/40 text-[9px] font-bold tracking-[0.2em] uppercase m-0 mb-[5px]">
										ALLOCATION ID
									</Text>
									<Text className="text-textLight text-[16px] font-bold m-0">
										{orderId}
									</Text>
								</Column>
								<Column align="right">
									<Text className="text-textLight/40 text-[9px] font-bold tracking-[0.2em] uppercase m-0 mb-[5px]">
										TOTAL GUARANTEE
									</Text>
									<Text className="text-brand text-[16px] font-bold m-0">
										${totalAmount.toLocaleString()}
									</Text>
								</Column>
							</Row>
						</Section>

						<Hr className="border-white/10 my-[30px]" />

						<Section className="my-[20px]">
							<Text className="text-textLight/40 text-[9px] font-bold tracking-[0.2em] uppercase m-0 mb-[15px]">
								YOUR SELECTION
							</Text>
							{cars.map((car, index) => (
								<Row key={index} className="mb-[20px]">
									<Column>
										<Text className="text-textLight text-[18px] font-bold m-0">
											{car.brand} {car.model}
										</Text>
										<Text className="text-brand text-[12px] mt-[5px] m-0">
											MSRP: ${car.price.toLocaleString()}
										</Text>
									</Column>
								</Row>
							))}
						</Section>

						<Hr className="border-white/10 my-[30px]" />

						<Section className="text-center mt-[40px]">
							<Text className="text-textLight/40 text-[11px] leading-[18px] mb-[20px]">
								This email confirms your non-refundable deposit. A concierge
								will contact you within 24 hours to finalize your bespoke
								configuration options.
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

export default OrderConfirmationEmail;
