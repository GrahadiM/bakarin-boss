import Link from "next/link";
import styles from "../components/app.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function formatCurrency(value) {
  if (!value) return "Rp 0";

  const numericValue = Number(value);

  if (isNaN(numericValue)) return "Invalid Number";

  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numericValue);

  return formattedValue;
}

const stars = Array.from({ length: 5 }, (_, index) => (
    <div className="col-1 col-star" key={index}>
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <FontAwesomeIcon
          icon={faStar}
          style={{ fontSize: 100, color: "orange" }}
        />
      </svg>
    </div>
));

export default function ProductCard({ data }) {
  return (
    <div className="col-12 col-md-4 mt-4">
      <div className={styles.product_card}>
        <div className={styles.product_icon}>
          <Link href="#">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                style={{ fontSize: 100, color: "white" }}
              />
            </svg>
          </Link>
          <Link
            href={`/product/${data?.id}`}
            className={styles.item_detail_button}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <FontAwesomeIcon
                icon={faEye}
                style={{ fontSize: 100, color: "white" }}
              />
            </svg>
          </Link>
        </div>
        <div className={styles.product_image}>
          <Image src={data?.img } alt="Menu" className="img-fluid" width="300" height="300" />
        </div>
        <div className={styles.product_content}>
          <h3>{data?.name}</h3>
          <div className="row mb-2">
            <div className="col-3"></div>
            {stars}
            <div className="col-3"></div>
          </div>
          {/* <ReactStars
            count={5}
            size={24}
            color2={'#ffd700'} /> */}
          <div className={styles.product_price}>
            <span>{formatCurrency(data?.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
