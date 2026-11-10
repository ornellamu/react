const PLANS_STORAGE_KEY = "fieldnotes-plans";

export const getPlans = () => {
  const savedPlans = localStorage.getItem(PLANS_STORAGE_KEY);

  if (savedPlans === null) {
    return [];
  }

  const plans = JSON.parse(savedPlans);

  if (!Array.isArray(plans) || !plans.every((plan) => typeof plan === "string")) {
    throw new Error("Saved plans have an invalid format.");
  }

  return plans;
};

export const addPlan = (plan) => {
  const plans = getPlans();
  plans.push(plan);
  localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
};
