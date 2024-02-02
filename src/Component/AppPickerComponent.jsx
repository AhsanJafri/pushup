const AppPickerComponent = ({
  label,
  open,
  setOpen,
  zIndex,
  data,
  labelPropertyName,
  valuePropertyName,
}) => {
  const items = [];
  data &&
    data.forEach(item => {
      items.push({
        label: item[labelPropertyName],
        value: item[valuePropertyName],
      });
    });
  return (
    <>
      <AppText style={styles.pickerLabel}>{label}</AppText>
      <AppPicker
        data={items}
        open={open}
        setOpen={setOpen}
        name={label.toLowerCase().replace(' ', '')}
        zIndex={zIndex}
        onItemSelect={() => {}}
      />
    </>
  );
};
