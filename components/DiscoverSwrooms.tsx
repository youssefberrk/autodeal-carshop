import { Showroom } from "@/types/Showroom";
import { Newsreader } from "next/font/google";
import { MapPin, Phone, Clock } from "lucide-react";

const newsreader = Newsreader({
	subsets: ["latin"],
	display: "swap",
	style: ["normal", "italic"],
});

const DiscoverSwrooms = () => {
	const showrooms: Showroom[] = [
		{
			id: 1,
			city: "London",
			adress: "12 Savile Row,Mayfair London W1S 3PQ, United Kingdom",
			phone: "+44 20 7946 0128",
			timing: {
				weekdays: "Mon - Sat: 10:00 - 18:00",
				weekends: "Fri - Sat: 11:00 - 23:00",
			},
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.1226882912233!2d-0.1401955!3d51.51096509999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d5f2aa686d%3A0x193c3e38475c9043!2sScabal%20Uk%2C%2012%20Savile%20Row%2C%20London%20W1S%203PQ%2C%20UK!5e0!3m2!1sen!2sma!4v1775566079280!5m2!1sen!2sma",
		},
		{
			id: 2,
			city: "Dubai",
			adress: "Sheikh Zayed Road, Al Quoz 1 Dubai, United Arab Emirates",
			phone: "+971 4 321 0987",
			timing: {
				weekdays: "Sun - Thu: 09:00 - 21:00",
				weekends: "Sunday: Private Viewing Only",
			},
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.942014539319!2d55.137080600000004!3d25.0699544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f13435f3abe57%3A0xb4c00b9d46311cd0!2sSheikh%20Zayed%20Rd%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sma!4v1775564138866!5m2!1sen!2sma",
		},
		{
			id: 3,
			city: "New York",
			adress: "520 W 28th St, Chelsea New York, NY 10001, USA",
			phone: "+1 212 555 0198",
			timing: {
				weekdays: "Mon - Fri: 09:00 - 19:00",
				weekends: "Sat: 10:00 - 17:00",
			},
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.499784169162!2d-74.00299095!3d40.7510311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259b6fafe1ee7%3A0x1050a0f81ea4ae4c!2s520%20W%2028th%20St%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sma!4v1775564472553!5m2!1sen!2sma",
		},
	];

	return (
		<section className="py-20">
			<div className="text-center">
				<span className="text-sm uppercase tracking-[0.3em] text-green-400">
					GLOBAL PRESENCE
				</span>
				<h1 className="mt-5 text-5xl font-bold tracking-wide text-white md:text-6xl">
					Discover Our Showrooms
				</h1>
			</div>
			<div className="flex flex-col md:flex-row  items-center w-full justify-center gap-[8em] mt-10 h-fit">
				{showrooms.map((att) => (
					<div key={att.id}>
						<div>
							<iframe
								src={att.mapUrl}
								className="w-full max-w-[400px] h-[300px]"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
						<div className="text-gray-300 ">
							<h1 className="text-3xl my-5 ml-1 newsreader">{att.city}</h1>
							<div className="flex flex-col gap-3 manrope">
								<div className="flex gap-4">
									<MapPin size={42} color="#46ac02" />
									<p>{att.adress}</p>
								</div>
								<div className="flex gap-4">
									<Phone color="#46ac02" />
									<p> {att.phone}</p>
								</div>
								<div className="flex gap-4">
									<Clock color="#46ac02" />
									<p>
										{att.timing.weekdays} <br />
										<span className="text-green-400">
											{att.timing.weekends}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default DiscoverSwrooms;
