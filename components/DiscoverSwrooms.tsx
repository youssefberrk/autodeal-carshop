import { Showroom } from "@/types/Showroom";
import { MapPin, Phone, Clock } from "lucide-react";

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
		<section className="py-20 overflow-x-hidden">
			<div className="text-center mb-16">
				<span className="text-sm uppercase tracking-widest text-green-400 font-manrope mb-6 block">
					GLOBAL PRESENCE
				</span>
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white heading">
					Discover Our Showrooms
				</h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
				{showrooms.map((att) => (
					<div
						key={att.id}
						className="border border-green-400/10 bg-gradient-to-br from-[#0d1f1a]/40 to-[#0a0f0d]/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]">
						<div className="mb-6">
							<iframe
								src={att.mapUrl}
								className="w-full h-64 rounded-lg border-0"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
						<div className="text-white">
							<h3 className="text-2xl md:text-3xl font-newsreader font-bold mb-6">
								{att.city}
							</h3>
							<div className="space-y-4 font-manrope">
								<div className="flex items-start gap-3">
									<MapPin size={20} color="#46ac02" className="shrink-0 mt-1" />
									<p className="text-sm md:text-base leading-relaxed text-gray-200">
										{att.adress}
									</p>
								</div>
								<div className="flex items-center gap-3">
									<Phone size={20} color="#46ac02" className="shrink-0" />
									<p className="text-sm md:text-base text-gray-200">
										{att.phone}
									</p>
								</div>
								<div className="flex items-start gap-3">
									<Clock size={20} color="#46ac02" className="shrink-0 mt-1" />
									<div className="text-sm md:text-base leading-relaxed">
										<p className="text-gray-200">{att.timing.weekdays}</p>
										<p className="text-green-400">{att.timing.weekends}</p>
									</div>
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
