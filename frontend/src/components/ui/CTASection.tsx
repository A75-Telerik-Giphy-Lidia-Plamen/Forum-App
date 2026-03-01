import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#7A3E17] dark:bg-[#5f2f12] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Don't Let Knowledge Disappear
        </h2>

        <p className="text-orange-100/90 text-sm md:text-base max-w-2xl mx-auto mb-8">
          Every skill you share helps preserve it for the next generation.
          Join thousands who believe in keeping traditional wisdom alive.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="
            inline-flex items-center gap-2
            bg-orange-500 hover:bg-orange-600
            text-white text-sm font-medium
            px-6 py-3 rounded-lg
            transition-colors duration-200
          "
        >
          Start Sharing Today
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </section>
  );
}