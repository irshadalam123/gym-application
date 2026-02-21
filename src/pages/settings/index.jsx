import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Dropdown, Toggle } from '../../components/common';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function SectionCard({ title, description, icon, children }) {
  return (
    <motion.section
      variants={item}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider">{title}</h2>
          {description && (
            <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="p-6 space-y-1">{children}</div>
    </motion.section>
  );
}

function Divider() {
  return <div className="border-t border-zinc-800 my-4" />;
}

const Settings = () => {
  const [gymName, setGymName] = useState('Prime Zone Fitness');
  const [email, setEmail] = useState('contact@primezone.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [address, setAddress] = useState('123 Fitness Ave, City');
  const [timezone, setTimezone] = useState('America/New_York');
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [openTime, setOpenTime] = useState('06:00');
  const [closeTime, setCloseTime] = useState('22:00');
  const [defaultClassDuration, setDefaultClassDuration] = useState(60);
  const [bookingWindowDays, setBookingWindowDays] = useState(7);
  const [renewalReminderDays, setRenewalReminderDays] = useState(7);
  const [defaultMembershipMonths, setDefaultMembershipMonths] = useState(12);

  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);
  const [classReminderHours, setClassReminderHours] = useState(24);
  const [expiryReminder, setExpiryReminder] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const timezones = [
    { value: 'America/New_York', label: 'Eastern (ET)' },
    { value: 'America/Chicago', label: 'Central (CT)' },
    { value: 'America/Denver', label: 'Mountain (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
    { value: 'Asia/Kolkata', label: 'India (IST)' },
  ];

  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={item} className="mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight">
            Settings
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage your gym profile, notifications, and preferences.
          </p>
        </motion.div>

        {/* Business / Profile */}
        <SectionCard
          title="Business & Profile"
          description="Your gym details and contact information"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        >
          <div className="py-3">
            <Input
              label="Gym name"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              placeholder="Your gym name"
            />
          </div>
          <div className="py-3">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@yourgym.com"
            />
          </div>
          <div className="py-3">
            <Input
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="py-3">
            <Input
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address"
            />
          </div>
          <Divider />
          <div className="py-3">
            <Dropdown
              label="Timezone"
              options={timezones}
              value={timezone}
              onChange={setTimezone}
              placeholder="Select timezone"
            />
          </div>
          <div className="py-3">
            <Input
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="USD"
            />
          </div>
          <div className="py-3">
            <Dropdown
              label="Date format"
              options={dateFormats}
              value={dateFormat}
              onChange={setDateFormat}
              placeholder="Select format"
            />
          </div>
        </SectionCard>

        {/* Operating hours */}
        <SectionCard
          title="Operating Hours"
          description="Default open and close times"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="py-3">
              <Input
                label="Open"
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
              />
            </div>
            <div className="py-3">
              <Input
                label="Close"
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
              />
            </div>
          </div>
        </SectionCard>

        {/* Membership defaults */}
        <SectionCard
          title="Membership Defaults"
          description="Default membership and renewal settings"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          }
        >
          <div className="py-3">
            <Input
              label="Default membership duration (months)"
              hint="When adding a new member"
              type="number"
              value={String(defaultMembershipMonths)}
              onChange={(e) => setDefaultMembershipMonths(Number(e.target.value) || 1)}
            />
          </div>
          <div className="py-3">
            <Input
              label="Renewal reminder (days before expiry)"
              hint="Send reminder this many days before membership expires"
              type="number"
              value={String(renewalReminderDays)}
              onChange={(e) => setRenewalReminderDays(Number(e.target.value) || 0)}
            />
          </div>
        </SectionCard>

        {/* Schedule defaults */}
        <SectionCard
          title="Schedule & Booking"
          description="Class and booking defaults"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        >
          <div className="py-3">
            <Input
              label="Default class duration (minutes)"
              type="number"
              value={String(defaultClassDuration)}
              onChange={(e) => setDefaultClassDuration(Number(e.target.value) || 30)}
            />
          </div>
          <div className="py-3">
            <Input
              label="Booking window (days ahead)"
              hint="How far in advance members can book"
              type="number"
              value={String(bookingWindowDays)}
              onChange={(e) => setBookingWindowDays(Number(e.target.value) || 1)}
            />
          </div>
        </SectionCard>

        {/* Notifications */}
        <SectionCard
          title="Notifications"
          description="Email and SMS reminders for members"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          }
        >
          <Toggle
            label="Email reminders"
            description="Send class and renewal reminders by email"
            checked={emailReminders}
            onChange={setEmailReminders}
          />
          <Divider />
          <Toggle
            label="SMS reminders"
            description="Send reminders via SMS (may incur cost)"
            checked={smsReminders}
            onChange={setSmsReminders}
          />
          <Divider />
          <div className="py-3">
            <Input
              label="Class reminder (hours before)"
              hint="When to send class reminder"
              type="number"
              value={String(classReminderHours)}
              onChange={(e) => setClassReminderHours(Number(e.target.value) || 0)}
            />
          </div>
          <Divider />
          <Toggle
            label="Expiry reminders"
            description="Notify members before membership expires"
            checked={expiryReminder}
            onChange={setExpiryReminder}
          />
          <Divider />
          <Toggle
            label="Marketing emails"
            description="News, tips, and promotions (optional)"
            checked={marketingEmails}
            onChange={setMarketingEmails}
          />
        </SectionCard>

        {/* Appearance & account */}
        <SectionCard
          title="Appearance & Account"
          description="Theme and account preferences"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <Toggle
            label="Dark mode"
            description="Use dark theme across the app"
            checked={darkMode}
            onChange={setDarkMode}
          />
          <Divider />
          <Toggle
            label="Email notifications"
            description="Receive system and account notifications"
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <Divider />
          <Toggle
            label="Two-factor authentication"
            description="Add extra security to your account"
            checked={twoFactor}
            onChange={setTwoFactor}
          />
        </SectionCard>

        {/* Data & backup */}
        <SectionCard
          title="Data & Backup"
          description="Export and backup your data"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          }
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-medium hover:bg-zinc-700 hover:border-zinc-600 transition"
            >
              Export members (CSV)
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-medium hover:bg-zinc-700 hover:border-zinc-600 transition"
            >
              Export full backup
            </button>
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            Export your data for records or migration. Backups include members, programs, and schedule.
          </p>
        </SectionCard>

        {/* Save actions */}
        <motion.div variants={item} className="flex flex-wrap gap-3 pt-4">
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm uppercase tracking-wider hover:bg-orange-600 focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900 transition"
          >
            Save changes
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium text-sm hover:bg-zinc-700 transition"
          >
            Cancel
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Settings;
