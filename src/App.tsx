import Grid from "@mui/material/Grid2";
import { CssBaseline } from "@mui/material";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar";
import SvgCanvas from "./components/SvgCanvas";
import HeatMap from "./components/Heatmap";
import DropDown from "./components/DropDown";
import { useAppStore } from "./state/AppStore";
import { useEffect } from "react";

const App = () => {
  const [geneExpressionData, setDatasetId, setClusterId] = useAppStore((state) => [
    state.data,
    state.setDatasetId,
    state.setClusterId,
  ]);

  useEffect(() => {
    setDatasetId(0);
  }, [])

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
            onOptionSelect={setDatasetId}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <DropDown
            primaryLabel="Clustering"
            options={["None", "Gene", "Gene and Sample"]}
            onOptionSelect={setClusterId}
          />
        </Grid>
        <Grid
          className="svg-container"
          sx={{ border: "2px solid black", borderRadius: 1, height: "1000px" }}
          size={12}
        >
          <SvgCanvas>
            {geneExpressionData ? <HeatMap geneExpressionData={geneExpressionData} /> : null}
          </SvgCanvas>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
