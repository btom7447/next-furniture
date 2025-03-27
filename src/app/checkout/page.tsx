"use client";

import { useAuth } from "@/components/AuthContext";
import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";
import BounceLoader from "react-spinners/BounceLoader";
import BreadCrumb from "@/components/BreadCrumb";
import CheckoutCatalog from "@/components/CheckoutCatalog";

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowModal(true);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <BounceLoader size={80} color="#FBEBB5" />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <BreadCrumb title="Checkout" />
          <CheckoutCatalog />
        </div>
      ) : (
        <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
