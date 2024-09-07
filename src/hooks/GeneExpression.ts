import { useEffect, useState } from "react";

interface MatrixCell {
  row: number;
  col: number;
  value: number;
}

interface Sample {
  id: string;
  desc: string;
  index: number;
}

interface Gene {
  id: string;
  index: number;
}

interface GeneExpressionData {
  nsamples: number;
  ngenes: number;
  matrix: MatrixCell[];
  samples: Sample[];
  genes: Gene[];
}

// interface ExpressionHookProps {
//   ordering: "gene" | "gene and sample" | "none" | null;
// }

const useExpressionData = (
  ordering: "gene" | "gene and sample" | "none" | null
): GeneExpressionData => {
  const [data, setData] = useState<GeneExpressionData | null>(null);
  // const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchJson = async () => {
      let path;
      switch (ordering) {
        case "gene":
          path = "../assets/data/ordered_by_gene_cluster_ge_data.json";
          break;
        case "gene and sample":
          path = "../assets/data/ordered_by_gene_cluster_ge_data.json";
          break;
        case "none":
        case null:
          path = "../assets/data/original_order_ge_data";
          break;
        default:
          path = "../assets/data/original_order_ge_data";
      }
      try {
        const jsonModule = await import(path);
        setData(jsonModule.default);
      } catch (error) {
        // setError(error as Error);
        console.log("Error occurred.")
      }
    };
    fetchJson();
  }, []);

  return data as GeneExpressionData;
};

export default useExpressionData;
