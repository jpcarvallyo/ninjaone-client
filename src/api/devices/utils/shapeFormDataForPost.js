export const shapeFormDataForPost = (formData) => ({
  system_name: formData.name,
  type: formData.deviceType,
  hdd_capacity: formData.hddCapacity,
});
