import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    eventDates: [],
    eventTimes: {}, // Store time ranges for each selected date
    eventType: '',
    otherFoodTrucks: 'no',
    attendees: 0,
    additionalInfo: '',
    numberOfVendors: 0
  });

  // Define date range logic (Min/Max)
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 7);
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 2);

  const eventTypes = [
    { label: 'Corporate', value: 'corporate' },
    { label: 'Wedding', value: 'wedding' },
    { label: 'Birthday', value: 'birthday' },
    { label: 'Festival', value: 'festival' },
    { label: 'Other', value: 'other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (e) => {
    const selectedDates = e.value || [];
    setFormData({
      ...formData,
      eventDates: selectedDates,
      eventTimes: selectedDates.reduce((acc, date) => {
        const dateStr = date.toDateString();
        if (!formData.eventTimes[dateStr]) {
          acc[dateStr] = { startTime: null, endTime: null };
        } else {
          acc[dateStr] = formData.eventTimes[dateStr];
        }
        return acc;
      }, {})
    });
  };

  const handleTimeChange = (date, time, type) => {
    const dateStr = date.toDateString();
    setFormData({
      ...formData,
      eventTimes: {
        ...formData.eventTimes,
        [dateStr]: {
          ...formData.eventTimes[dateStr],
          [type]: time
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Booking request submitted!');
  };

  const customStyles = {
    pageBackground: {
      backgroundColor: '#FFD9F0',
      backgroundImage: 'url(/images/Birria_Boss_pattern_TRANSPARENT-02.png)',
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
    },
    container: {
      maxWidth: '600px',
      width: '100%',
      padding: '30px',
      backgroundColor: '#FFB4E1', // Light hot pink without transparency
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
      color: '#DB0B00',
      textAlign: 'center',
      marginBottom: '20px',
      fontFamily: "'Bukhari Script', cursive",
      fontSize: '36px',
    },
    subheader: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 'bold',
      fontSize: '18px',
      color: '#DB0B00',
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#DB0B00',
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: '600',
      fontSize: '16px',
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '4px',
      border: '1px solid #DB0B00',
    },
    radioGroup: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      backgroundColor: '#DB0B00',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    quote: {
      fontFamily: "'Open Sans', sans-serif",
      fontStyle: 'italic',
      fontSize: '16px',
      color: '#DB0B00',
      marginTop: '20px',
      textAlign: 'center',
    },
    caption: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: '300',
      fontSize: '14px',
      color: '#DB0B00',
      marginTop: '10px',
      textAlign: 'center',
    },
  };

  return (
    <div style={customStyles.pageBackground}>
      <div style={customStyles.container}>
        <h1 style={customStyles.header}>Book Your Event</h1>
        <h2 style={customStyles.subheader}>Fill out the form below to get started</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="companyName" style={customStyles.label}>Company Name</label>
            <InputText id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter company name" style={customStyles.input} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="contactName" style={customStyles.label}>Contact Name *</label>
            <InputText id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} required placeholder="Enter contact name" style={customStyles.input} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="contactEmail" style={customStyles.label}>Contact Email *</label>
            <InputText id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required placeholder="Enter email address" style={customStyles.input} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="eventDates" style={customStyles.label}>Event Date(s) *</label>
            <Calendar
              id="eventDates"
              value={formData.eventDates}
              onChange={handleDateChange}
              selectionMode="multiple"
              minDate={minDate}
              maxDate={maxDate}
              showIcon
              prevIcon="pi pi-chevron-left"
              nextIcon="pi pi-chevron-right"
              readOnlyInput
              required
              style={{ width: '100%' }}
            />
          </div>

          {/* Render time inputs for each selected date */}
          {formData.eventDates.map((date, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <label style={customStyles.label}>Event Time for {date.toDateString()}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Calendar
                  value={formData.eventTimes[date.toDateString()]?.startTime}
                  onChange={(e) => handleTimeChange(date, e.value, 'startTime')}
                  timeOnly
                  showIcon
                  placeholder="Start Time"
                  hourFormat="24"
                  style={customStyles.input}
                />
                <Calendar
                  value={formData.eventTimes[date.toDateString()]?.endTime}
                  onChange={(e) => handleTimeChange(date, e.value, 'endTime')}
                  timeOnly
                  showIcon
                  placeholder="End Time"
                  hourFormat="24"
                  style={customStyles.input}
                />
              </div>
            </div>
          ))}

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="eventType" style={customStyles.label}>Event Type *</label>
            <Dropdown
              id="eventType"
              name="eventType"
              value={formData.eventType}
              options={eventTypes}
              onChange={(e) => setFormData({ ...formData, eventType: e.value })}
              placeholder="Select Event Type"
              required
              style={customStyles.input}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={customStyles.label}>Will there be other food trucks or food offered at the event? *</label>
            <div style={customStyles.radioGroup}>
              <RadioButton
                inputId="otherFoodTrucksYes"
                name="otherFoodTrucks"
                value="yes"
                onChange={handleChange}
                checked={formData.otherFoodTrucks === 'yes'}
              />
              <label htmlFor="otherFoodTrucksYes" style={customStyles.label}>Yes</label>

              <RadioButton
                inputId="otherFoodTrucksNo"
                name="otherFoodTrucks"
                value="no"
                onChange={handleChange}
                checked={formData.otherFoodTrucks === 'no'}
              />
              <label htmlFor="otherFoodTrucksNo" style={customStyles.label}>No</label>
            </div>

            {formData.otherFoodTrucks === 'yes' && (
              <div style={{ marginTop: '10px' }}>
                <label htmlFor="numberOfVendors" style={customStyles.label}>Number of other food vendors *</label>
                <InputNumber
                  id="numberOfVendors"
                  name="numberOfVendors"
                  value={formData.numberOfVendors}
                  onValueChange={(e) => setFormData({ ...formData, numberOfVendors: e.value })}
                  required
                  style={customStyles.input}
                  placeholder="Enter number of vendors"
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="attendees" style={customStyles.label}>Expected Number of Attendees *</label>
            <InputNumber
              id="attendees"
              name="attendees"
              value={formData.attendees}
              onValueChange={(e) => setFormData({ ...formData, attendees: e.value })}
              required
              style={customStyles.input}
              placeholder="Enter number of attendees"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="additionalInfo" style={customStyles.label}>Additional Information</label>
            <InputTextarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={4}
              placeholder="Enter any additional information"
              style={customStyles.input}
            />
          </div>

          <Button label="Submit Booking Request" icon="pi pi-check" type="submit" style={customStyles.button} />
        </form>

        <p style={customStyles.quote}>"Creating unforgettable events, one booking at a time."</p>
        <p style={customStyles.caption}>We look forward to making your event special!</p>
      </div>
    </div>
  );
};

export default BookingForm;
