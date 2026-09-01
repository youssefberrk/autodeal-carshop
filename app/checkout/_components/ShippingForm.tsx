import { UseFormReturn, Controller } from 'react-hook-form';
import { Truck } from 'lucide-react';
import CountrySelect from '@/components/ui/CountrySelect';
import { ShippingFormData } from '../_schemas/checkoutSchema';

interface ShippingFormProps {
  form: UseFormReturn<ShippingFormData>;
}

export default function ShippingForm({ form }: ShippingFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const inputBase =
    'w-full bg-[#05140d]/90 border rounded-xl px-5 py-4 text-sm font-medium text-[#e5efe3] focus:border-[#00ff87] focus:bg-[#081e13] focus:shadow-[0_0_20px_rgba(0,255,135,0.15)] focus:outline-none transition-all duration-300 placeholder:text-[#dae6d8]/20 shadow-inner';
  const borderOk = 'border-[#dae6d8]/15 hover:border-[#dae6d8]/30';
  const borderErr = 'border-red-500/80 bg-red-500/5';

  return (
    <section>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] border border-[#00ff87]/25 rounded-xl shadow-[0_0_15px_rgba(0,255,135,0.1)]">
          <Truck size={22} />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-['Newsreader'] italic font-bold text-[#e5efe3]">
            Delivery Concierge
          </h3>
          <p className="text-[10px] text-[#dae6d8]/50 uppercase tracking-[0.2em] mt-0.5 font-semibold">
            Where your build should be delivered
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">
            Full Name
          </label>
          <input
            type="text"
            {...register('fullName')}
            className={`${inputBase} ${errors.fullName ? borderErr : borderOk}`}
            placeholder="Julian Obsidian"
          />
          {errors.fullName?.message && (
            <span className="text-red-500 text-[10px] mt-1 block">{errors.fullName.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            className={`${inputBase} ${errors.email ? borderErr : borderOk}`}
            placeholder="concierge@obsidian.com"
          />
          {errors.email?.message && (
            <span className="text-red-500 text-[10px] mt-1 block">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">
            Phone Number <span className="text-[#dae6d8]/20 font-normal lowercase">(optional)</span>
          </label>
          <input
            type="tel"
            {...register('phoneNumber')}
            className={`${inputBase} ${errors.phoneNumber ? borderErr : borderOk}`}
            placeholder="+1 (555) 0199"
          />
          {errors.phoneNumber?.message && (
            <span className="text-red-500 text-[10px] mt-1 block">{errors.phoneNumber.message}</span>
          )}
        </div>

        {/* Country */}
        <div>
          <Controller
            name="countryName"
            control={control}
            render={({ field }) => (
              <CountrySelect
                label="Country"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.countryName?.message && (
            <span className="text-red-500 text-[10px] mt-1 block">{errors.countryName.message}</span>
          )}
        </div>

        {/* Address — full width */}
        <div className="md:col-span-2">
          <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">
            Destination Address
          </label>
          <input
            type="text"
            {...register('address')}
            className={`${inputBase} ${errors.address ? borderErr : borderOk}`}
            placeholder="128 Kinetic Way, Beverly Hills, CA"
          />
          {errors.address?.message && (
            <span className="text-red-500 text-[10px] mt-1 block">{errors.address.message}</span>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">
            City
          </label>
          <input
            type="text"
            {...register('city')}
            className={`${inputBase} ${errors.city ? borderErr : borderOk}`}
            placeholder="Los Angeles"
          />
          {errors.city?.message && (
            <span className="text-red-500 text-[10px] mt-1 block">{errors.city.message}</span>
          )}
        </div>

        {/* State + Postal side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">
              State / Region <span className="text-[#dae6d8]/20 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              {...register('stateName')}
              className={`${inputBase} ${errors.stateName ? borderErr : borderOk}`}
              placeholder="CA"
            />
            {errors.stateName?.message && (
              <span className="text-red-500 text-[10px] mt-1 block">{errors.stateName.message}</span>
            )}
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">
              Postal Code
            </label>
            <input
              type="text"
              {...register('postalCode')}
              className={`${inputBase} ${errors.postalCode ? borderErr : borderOk}`}
              placeholder="90210"
            />
            {errors.postalCode?.message && (
              <span className="text-red-500 text-[10px] mt-1 block">{errors.postalCode.message}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
