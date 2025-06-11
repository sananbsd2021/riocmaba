import { Button } from "@/components/ui/button";
import BookBidpropsPage from "./SuppliespropsPage";
import PaginatedBookBidPage from "./PaginatedSuppliesPage";
import SearchForm from "./searchPage";
// import SearchForm from "./SearchForm"; // นำเข้า SearchForm

export default function HomePage() {
    return (
        <div className="container p-4">

            {/* ฟอร์มค้นหา */}
            <div className="mb-8">
            {/* <SearchForm /> */}
            </div>

            {/* ปุ่มค้นหา (ถ้าจำเป็น) */}
            {/* <Button>Search</Button> */}

            {/* ส่วน BookBidpropsPage */}
            <div className="mb-8">
                <BookBidpropsPage />
            </div>

            {/* ส่วน PaginatedBookBidPage */}
            <PaginatedBookBidPage />
        </div>
    );
}
