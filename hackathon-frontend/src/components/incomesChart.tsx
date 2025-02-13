import { CardContainer } from "./CardContainer";
import { AreaChart, LineChart } from "@mantine/charts";

// export const fruitData = [
//   {
//     date: "Mar 22",
//     Apples: 2890,
//     Oranges: 2338,
//     Tomatoes: 2452,
//   },
//   {
//     date: "Mar 23",
//     Apples: 2756,
//     Oranges: 2103,
//     Tomatoes: 2402,
//   },
//   {
//     date: "Mar 24",
//     Apples: 3322,
//     Oranges: 986,
//     Tomatoes: 1821,
//   },
//   {
//     date: "Mar 25",
//     Apples: 3470,
//     Oranges: 2108,
//     Tomatoes: 2809,
//   },
//   {
//     date: "Mar 26",
//     Apples: 3129,
//     Oranges: 1726,
//     Tomatoes: 2290,
//   },
// ];

const chartData = [
  { Age: "63", Annuities: 0, SocialSecurity: 0, Other: 0 },
  { Age: "65", Annuities: 8000, SocialSecurity: 0, Other: 6000 },
  { Age: "70", Annuities: 8500, SocialSecurity: 2800, Other: 5000 },
  { Age: "75", Annuities: 9000, SocialSecurity: 3167, Other: 6150 },
  { Age: "80", Annuities: 9500, SocialSecurity: 3584, Other: 7280 },
  { Age: "85", Annuities: 10000, SocialSecurity: 4055, Other: 8100 },
  { Age: "90", Annuities: 10500, SocialSecurity: 4558, Other: 9200 },
];

export const IncomesChart = () => {
  const data = [
    {
      date: "Mar 22",
      Annuities: 2890,
      SocialSecurity: 2338,
      Other: 2452,
    },
    {
      date: "Mar 23",
      Annuities: 2756,
      SocialSecurity: 2103,
      Other: 2402,
    },
    {
      date: "Mar 24",
      Annuities: 3322,
      SocialSecurity: 986,
      Other: 1821,
    },
    {
      date: "Mar 25",
      Annuities: 3470,
      SocialSecurity: 2108,
      Other: 2809,
    },
    {
      date: "Mar 26",
      Annuities: 3129,
      SocialSecurity: 1726,
      Other: 2290,
    },
  ];
  return (
    <CardContainer
      style={{
        height: "11.5rem",
        padding: "1rem",
      }}
    >
      {/*<AreaChart*/}
      {/*  h={300}*/}
      {/*  data={fruitData}*/}
      {/*  dataKey="date"*/}
      {/*  type="stacked"*/}
      {/*  series={[*/}
      {/*    { name: "Apples", color: "indigo.6" },*/}
      {/*    { name: "Oranges", color: "blue.6" },*/}
      {/*    { name: "Tomatoes", color: "teal.6" },*/}
      {/*  ]}*/}
      {/*  curveType={"natural"}*/}
      {/*/>*/}

      <LineChart
        h={150}
        withLegend
        data={chartData}
        dataKey="Age"
        series={[
          { name: "Annuities", color: "indigo.6" },
          { name: "SocialSecurity", color: "blue.6" },
          { name: "Other", color: "teal.6" },
        ]}
        curveType="natural"
        gridAxis="xy"
        withDots={false}
      />

      {/*<LineChart*/}
      {/*  h={150}*/}
      {/*  withLegend*/}
      {/*  data={chartData}*/}
      {/*  dataKey="Age"*/}
      {/*  series={[*/}
      {/*    { name: "Annuities", color: "indigo.6" },*/}
      {/*    { name: "SocialSecurity", color: "blue.6" },*/}
      {/*    { name: "Other", color: "teal.6" },*/}
      {/*  ]}*/}
      {/*  curveType="natural"*/}
      {/*  gridAxis="xy"*/}
      {/*  withDots={false}*/}
      {/*/>*/}
    </CardContainer>
  );
};
