export default function WeekSetting() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const api = useAxiosPrivate();
  const onSub = async (data) => {
    console.log(data);
    const result = await api.put('/setWeekConstant',{...data})
  };

  const defaultValues = async () => {
    const result = await api.get("/getBatchConstant");
    const value = result.data.filter(
      (c) =>
        c.key === "no_weeks"
    );

  };
  useEffect(()=>{defaultValues()},[""])
  return (
    <form onClick={handleSubmit(onSub)}>
      <Box sx={leftCol}>
        <FormControl sx={groupStyled}>
          <FormLabel sx={labelStyled}>semester length(in weeks)</FormLabel>
          <TextField
            id="no"
            name="no_weeks"
            {...register("no_weeks")}
            fullWidth
            error={errors.no_weeks ? true : false}
          />
          <FormHelperText>{errors.no_weeks?.message}</FormHelperText>
        </FormControl>
      </Box>

      
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "teritiary.lighter1",
            "&:hover": {
              backgroundColor: "teritiary.main",
            },
          }}
          onClick={() => {
            navigate("/batch_management");
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "secondary.lighter1",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
          type="submit"
          onClick={() => {}}
        >
          Save
        </Button>
    </form>
  );
}
