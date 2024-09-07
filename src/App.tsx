import Grid from "@mui/material/Grid2";
import { CssBaseline } from "@mui/material";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar";
import SvgCanvas from "./components/SvgCanvas";
import HeatMap from "./components/Heatmap";
import DropDown from "./components/DropDown";

const App = () => {
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <Grid container spacing={2} padding={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <DropDown
            primaryLabel="Dataset"
            options={[
              "Potra Cellulose Synthase",
              "Picab Photosynthesis I",
              "Pinsy DNA Methylation",
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <DropDown
            primaryLabel="Clustering"
            options={[
              "None",
              "Gene",
              "Gene and Sample",
            ]}
          />
        </Grid>
        <Grid
          className="svg-container"
          sx={{ border: "2px solid black", borderRadius: 1, height: "1000px" }}
          size={12}
        >
          <SvgCanvas>
            <HeatMap />
          </SvgCanvas>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
