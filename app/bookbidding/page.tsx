import { Button } from "@/components/ui/button";
import BookBidpropsPage from "./BookBidpropsPage";
// import PaginatedBookBidPage from "./PaginatedBookBidPage";
// import SearchBookbidForm from "./search/page";
// import SearchForm from "./searchPage";
// import SearchBookbidForm from "./searchPage";
import ResponsiveTableDemo from "./hidden-table";
// import SearchForm from "./SearchForm"; // นำเข้า SearchForm
// import SearchBookbidForm from "./searchPage";

export default function HomePage() {
  return (
    <div className="container p-4">
      {/* ฟอร์มค้นหา */}
      <div className="mb-8">{/* <SearchBookbidForm /> */}</div>

      {/* ปุ่มค้นหา (ถ้าจำเป็น) */}
      {/* <Button>Search</Button> */}

      {/* ส่วน BookBidpropsPage */}
      <div className="mb-8">
        <BookBidpropsPage />
        {/* <SearchBookbidForm /> */}
      </div>

      {/* ส่วน PaginatedBookBidPage */}
      {/* <PaginatedBookBidPage /> */}
      <ResponsiveTableDemo />
    </div>
  );
}
