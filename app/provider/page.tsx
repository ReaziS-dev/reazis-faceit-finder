import Button from "./button";
import Displayer1 from "./displayer1";
import Displayer2 from "./displayer2";

export default function ProviderExample() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-2xl font-bold">Provider Example</h1>
      <div className="flex gap-5">
        <Button />
        <Displayer1 />
        <Displayer2 />
      </div>
    </div>
  );
}
