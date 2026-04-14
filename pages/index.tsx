import ListNews from "@/components/News/ListNews";
import Business from "@/components/Business/index";
import ImportantNews from "@/components/ImportantNews";


export default function Home() {
  return (
    <>
        <ListNews />
        <Business/>
        <ImportantNews/>
    </>
  );
}
