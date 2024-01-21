import Link from "next/link";
import styles from "../components/app.module.css";
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartShopping,
  faCartPlus,
  faEye,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({ data }) {
  return (
    
    <div className="col-12 col-md-4 mt-4" x-for="(item, index) in items" x-key="index">
        <div className={styles.product_card}>
        <div className={styles.product_icon}>
            <Link href="#">
            <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <FontAwesomeIcon
                icon={faCartPlus}
                style={{ fontSize: 100, color: "white" }}
                />
            </svg>
            </Link>
            <Link href={`/product/${data?.id}`} className={styles.item_detail_button}>
            <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
            <FontAwesomeIcon
                icon={faEye}
                style={{ fontSize: 100, color: "white" }}
            />
            </svg>
            </Link>
        </div>
        <div className={styles.product_image}>
            <Image src={(data?.menuImg)} alt="Menu" className="img-fluid" />
        </div>
        <div className={styles.product_content}>
            <h3 x-text="item.name">{(data?.menuName).toString()}</h3>
            <div className={styles.product_stars}>
            <svg
                width="24"
                height="24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 100, color: "orange" }}
                />
            </svg>
            <svg
                width="24"
                height="24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 100, color: "orange" }}
                />
            </svg>
            <svg
                width="24"
                height="24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 100, color: "orange" }}
                />
            </svg>
            <svg
                width="24"
                height="24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 100, color: "orange" }}
                />
            </svg>
            <svg
                width="24"
                height="24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 100, color: "orange" }}
                />
            </svg>
            </div>
            <div className={styles.product_price}>
            <span x-text="rupiah(item.price)"></span>
            </div>
        </div>
        </div>
    </div>
  );
}