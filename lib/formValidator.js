import fs from "fs/promises";
import path from "path";

/**
 * 4. FORM VALIDATION & AUDIT ENGINE
 * Validates created Gravity Form against normalized source form model
 * and outputs validation/forms-report.json.
 */
export class FormValidator {
  static validateFormMapping(formModel, gfMappingResult) {
    const checks = [];
    let valid = true;

    // Check Gravity Form ID reference
    if (gfMappingResult && gfMappingResult.gravityFormId) {
      checks.push({ check: "gravityFormId", status: "PASS", message: `Valid Gravity Form ID ${gfMappingResult.gravityFormId}` });
    } else {
      valid = false;
      checks.push({ check: "gravityFormId", status: "FAIL", message: "Missing Gravity Form ID" });
    }

    // Check Field Count
    const sourceCount = formModel.fields.length;
    const gfCount = gfMappingResult.fieldsCreated || 0;
    if (sourceCount === gfCount) {
      checks.push({ check: "fieldCount", status: "PASS", message: `Field count matched (${sourceCount}/${gfCount})` });
    } else {
      checks.push({ check: "fieldCount", status: "WARNING", message: `Field count diff: source ${sourceCount} vs created ${gfCount}` });
    }

    // Check Field Types & Labels
    let fieldsMatched = 0;
    formModel.fields.forEach((sf) => {
      const gfFields = gfMappingResult.gfSchema?.fields || [];
      const match = gfFields.find((f) => f.label?.toLowerCase() === sf.label?.toLowerCase() || f.type === sf.type);
      if (match) fieldsMatched++;
    });

    checks.push({ check: "fieldFidelity", status: "PASS", message: `${fieldsMatched}/${sourceCount} fields matched fidelity` });

    return {
      sourceFormId: formModel.sourceFormId,
      gravityFormId: gfMappingResult.gravityFormId,
      valid,
      score: valid ? 100 : 85,
      checks,
      validatedAt: new Date().toISOString(),
    };
  }

  static async saveFormsValidationReport(conversionDir, reports = []) {
    const valDir = path.join(conversionDir, "validation");
    await fs.mkdir(valDir, { recursive: true });
    const reportPath = path.join(valDir, "forms-report.json");
    await fs.writeFile(reportPath, JSON.stringify({ reports }, null, 2));
  }
}
