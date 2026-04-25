import { onCleanup, onMount } from "solid-js";
import * as d3 from "d3";
import worldData from "../lib/world.json";
import { visitedCountries } from "../lib/travel";

const GlobeComponent = () => {
  let mapContainer: HTMLDivElement | undefined;

  onMount(() => {
    if (!mapContainer) return;

    const getThemeColor = (name: string, fallback: string) => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();

      return value || fallback;
    };

    const width = mapContainer.clientWidth;
    const height = Math.min(560, Math.max(320, width * 0.72));
    const sensitivity = 75;
    const scale = Math.min(width, height) * 0.45;

    let projection = d3
      .geoOrthographic()
      .scale(scale)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);

    const initialScale = projection.scale();
    let pathGenerator = d3.geoPath().projection(projection);

    let svg = d3
      .select(mapContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const globe = svg
      .append("circle")
      .attr("stroke-width", "0.2")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", initialScale);

    let map = svg.append("g");

    const countries = map
      .append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", (d: any) => pathGenerator(d as any))
      .style("stroke-width", 0.3)
      .style("opacity", 0.8);

    const applyThemeColors = () => {
      const ocean = getThemeColor("--globe-ocean", "#ffffff");
      const land = getThemeColor("--globe-land", "#f8f6f1");
      const visited = getThemeColor("--globe-visited", "#151515");
      const line = getThemeColor("--globe-line", "#151515");

      globe.attr("fill", ocean).attr("stroke", line);
      countries
        .attr("fill", (d: { properties: { name: string } }) =>
          visitedCountries.includes(d.properties.name) ? visited : land
        )
        .style("stroke", line);
    };

    applyThemeColors();
    window.addEventListener("themechange", applyThemeColors);

    const rotation = d3.timer(() => {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([rotate[0] - 1 * k, rotate[1]]);
      svg.selectAll("path").attr("d", (d: any) => pathGenerator(d as any));
    }, 200);

    onCleanup(() => {
      window.removeEventListener("themechange", applyThemeColors);
      rotation.stop();
      svg.remove();
    });
  });

  return (
    <div class="flex flex-col justify-center items-center w-full h-full">
      <div class="w-full" ref={mapContainer}></div>
    </div>
  );
};

export default GlobeComponent;
