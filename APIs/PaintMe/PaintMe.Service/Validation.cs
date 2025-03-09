namespace PaintMe.Service
{
    public class Validation
    {
        public static bool IsValidIsraeliID(string israeliID)
        {
            if (israeliID.Length != 9)
                return false;

            long sum = 0;

            for (int i = 0; i < israeliID.Length; i++)
            {
                var digit = israeliID[israeliID.Length - 1 - i] - '0';
                sum += (i % 2 != 0) ? GetDouble(digit) : digit;
            }

            return sum % 10 == 0;

            int GetDouble(long i)
            {
                switch (i)
                {
                    case 0: return 0;
                    case 1: return 2;
                    case 2: return 4;
                    case 3: return 6;
                    case 4: return 8;
                    case 5: return 1;
                    case 6: return 3;
                    case 7: return 5;
                    case 8: return 7;
                    case 9: return 9;
                    default: return 0;
                }
            }
        }
        public static bool IsTzValid(string value)
        {
            if (string.IsNullOrEmpty(value) || value.Length != 9)
                return false;
            int sum = 0;
            for (int i = 0; i < 9; i++)
            {
                if (i % 2 == 0)
                    sum += (2 * value[i]);
                else
                    sum += value[i];
            }
            if (sum > 100)
                sum = sum / 100 + sum % 10 + sum / 10 % 10;
            else
                sum = sum / 10 + sum % 10;
            return sum == 10;
        }
    }
}